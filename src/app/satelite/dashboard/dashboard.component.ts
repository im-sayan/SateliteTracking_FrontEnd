import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as satellite from 'satellite.js';
// import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { OSM, XYZ } from 'ol/source';
import { Control } from 'ol/control';
import { defaults as defaultControls } from 'ol/control';
import { ScaleLine, ZoomSlider, Zoom } from 'ol/control';
import { Geolocation } from 'ol'; // Import Geolocation class
import { Subscription, interval } from 'rxjs';
import * as ol from 'ol';
import { Stroke, Fill, Circle as CircleStyle } from 'ol/style';

import Attribution from 'ol/control/Attribution';

import Rotate from 'ol/control/Rotate';
import MousePosition from 'ol/control/MousePosition';
import FullScreen from 'ol/control/FullScreen';
import OverviewMap from 'ol/control/OverviewMap';
import L from 'leaflet';

import { fromLonLat, toLonLat } from 'ol/proj'; // Import toLonLat
import { Map } from 'ol'; // Import Map class
import { click, pointerMove } from 'ol/events/condition';
import { Select } from 'ol/interaction';
import nominatim from 'nominatim-browser';
import { ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../ENV/env';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  faFilter = faFilter;
  private map!: Map;
  private tleData: any[] = [];
  private satelliteFeatures: Feature[] = [];
  //private vectorSource!: VectorSource;
  isLoading: boolean = true;
  isLoading2: boolean = true;
  private updateInterval!: Subscription;
  isNight: boolean = false;
  geolocation: Geolocation | undefined;
  selectedSatelite: any = ['ISS (ZARYA)', 'STARLINK-1522', 'NOAA 15','COSMOS 2482'];
  list: any;
  selectedFeature: Feature | null = null;

  currentPage: number = 1; // Current page
  itemsPerPage: number = 100; // Items per page
  paginatedList: any[] = []; // Data to display for the current page
  totalPages: number = 0;
  selectedItems: any = [];
  totalItems: any;
  isFilterPopupVisible = false;

  pageSize = 4; // Number of items per page
  //currentPage = 0;
  serverError = false;
  count: number = 0;
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer = new VectorLayer({
    source: this.vectorSource,
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initializeMap();
    this.fetchTLEData();
  }

  initializeMap(): void {
    const GRAVITATIONAL_PARAMETER = 398600.4418; // in km^3/s^2 (Earth's gravitational constant)
    const EARTH_RADIUS = 6371; // in km (Earth's average radius)
    const INITIAL_ZOOM = 2.5; // Set the desired zoom level
    const MIN_ZOOM = 0; // Lock minimum zoom
    const MAX_ZOOM = 19; // Lock maximum zoom

    // Create the map view
    const view = new View({
        projection: 'EPSG:3857',
        center: [0, 0], // Adjust center
        zoom: INITIAL_ZOOM,
        minZoom: MIN_ZOOM, // Set minimum zoom
        maxZoom: MAX_ZOOM,
        rotation: 0, // Ensure the map starts with no rotation
    });

    // Create the map
    this.map = new Map({
        target: 'globeContainer', // Ensure this target matches the element id
        view: view,
        layers: [
            new TileLayer({
                source: new OSM(),
                opacity: 100,
            }),
            new TileLayer({
                source: new XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                }),
                opacity: 0.4,
            }),
            this.vectorLayer,
        ],
        controls: [new FullScreen()],
    });

    // Detect if the user is on a mobile device
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Create the Select interaction
    const selectInteraction = new Select({
        condition: isMobile ? click : pointerMove, // Use click for mobile, pointerMove for desktop
        layers: [this.vectorLayer], // Apply to vector layer
    });

    // Add the select interaction to the map
    this.map.addInteraction(selectInteraction);

    // Reset map orientation on move end (prevents unwanted rotation)
    this.map.on('moveend', () => {
        view.setRotation(0); // Reset rotation to 0
    });

    // Add event listener for selecting a feature
    selectInteraction.on('select', (e) => {
        const selectedFeature = e.selected[0]; // Get the first selected feature
        if (selectedFeature) {
            const geometry = selectedFeature.getGeometry();
            if (geometry instanceof Point) {
                const coordinates = geometry.getCoordinates();
                const lonLat = fromLonLat(coordinates); // Convert to longitude/latitude
                const satelliteName = selectedFeature.get('name'); // Get satellite name

                // Use the TLE data (assuming you have it in the 'tleData' array)
                const tleData = this.tleData.find(
                    (data) => data.name === satelliteName
                );
                if (tleData) {
                    // Parse TLE to get satellite information
                    const satrec = satellite.twoline2satrec(
                        tleData.tleLine1,
                        tleData.tleLine2
                    );

                    // Get the current position and velocity (height and speed)
                    const currentTime = new Date();
                    const positionAndVelocity = satellite.propagate(
                        satrec,
                        currentTime
                    );

                    if (
                        positionAndVelocity &&
                        positionAndVelocity.position &&
                        positionAndVelocity.velocity
                    ) {
                        const { position, velocity } = positionAndVelocity;

                        // Type guard to check if position is a valid EciVec3<number>
                        if (
                            position &&
                            typeof position === 'object' &&
                            position.x !== undefined &&
                            position.y !== undefined &&
                            position.z !== undefined
                        ) {
                            // Altitude Calculation using simplified method
                            const radialDistance = Math.sqrt(
                                position.x * position.x +
                                    position.y * position.y +
                                    position.z * position.z
                            );
                            const altitude = radialDistance - EARTH_RADIUS; // Subtract Earth's radius

                            // Speed Calculation using simplified method
                            let speed = 0;
                            if (
                                velocity &&
                                typeof velocity === 'object' &&
                                velocity.x !== undefined &&
                                velocity.y !== undefined &&
                                velocity.z !== undefined
                            ) {
                                speed =
                                    Math.sqrt(
                                        velocity.x * velocity.x +
                                            velocity.y * velocity.y +
                                            velocity.z * velocity.z
                                    ) * 3.6; // Convert m/s to km/h
                            }

                            // Show the satellite popup with height and speed
                            this.showSatellitePopup(lonLat, satelliteName, altitude, speed);
                        } else {
                            console.error('Invalid position data');
                        }
                    } else {
                        console.error(
                            'Unable to calculate position and velocity for satellite.'
                        );
                    }
                }
            }
        }
    });
}


  showFeatureInfo(feature: Feature) {
    const geometry = feature.getGeometry();

    // Ensure the geometry is a Point before calling getCoordinates()
    if (geometry instanceof Point) {
      const coordinates = geometry.getCoordinates();
      const lonLat = toLonLat(coordinates); // Convert to longitude/latitude

      // Add your code here to show a popup or other details about the feature
    } else {
      console.error('Feature geometry is not a Point geometry');
    }
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      this.updateInterval.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }

  addDayNightEffect(): void {
    // Create the night layer
    const nightLayer = new TileLayer({
      source: new OSM({
        url: 'https://your-night-tile-url', // Use your custom night tile URL here
        attributions: [], // Remove attribution label
      }),
      opacity: 0.5, // Adjust opacity for night effect
    });

    // Initialize your map with the night layer
    this.map = new Map({
      target: 'map', // The ID of the HTML element where the map is displayed
      layers: [
        nightLayer, // Add the night layer
      ],
      controls: defaultControls({
        attribution: false, // Disable default attribution control
      }),
      view: new View({
        center: [0, 0], // Example center, replace with your map's center coordinates
        zoom: 4, // Example zoom level
      }),
    });

    // Periodically check if it's day or night and toggle the night layer visibility
    this.updateInterval = interval(60 * 60 * 1000).subscribe(() => {
      // Check every hour
      const currentHour = new Date().getHours();
      this.isNight = currentHour >= 19 || currentHour < 7; // Night time is between 7 PM and 7 AM

      if (this.isNight) {
        nightLayer.setVisible(true); // Make the night layer visible
        this.map.getViewport().style.filter = 'brightness(0.4)'; // Darken the map for night mode
      } else {
        nightLayer.setVisible(false); // Hide the night layer
        this.map.getViewport().style.filter = 'brightness(1)'; // Restore normal brightness for day mode
      }
    });

    // Style the night layer image to appear at the bottom corner
    const tileLayerElement = document.querySelector('.ol-tile');
    if (tileLayerElement) {
      tileLayerElement.classList.add('custom-night-layer');
    }
  }

  selectSTA(item: any) {
    // Check if item is already selected
    const index = this.selectedSatelite.indexOf(item);

    if (index > -1) {
      // ❌ If already selected, remove it
      this.selectedSatelite.splice(index, 1);
    } else {
      // ✅ Otherwise, add it
      this.selectedSatelite.push(item);
    }
  }

  clearFilters() {
    this.selectedSatelite = []; // ✅ Clear all selections
    this.list.forEach((f: any) => (f.selected = false));
    this.fetchTLEData();
  }

  applyFilters() {
    this.fetchTLEData();
  }

  fetchTLEData(): void {
    const tleUrl = `${environment.apiURL}/satelite/track`;

    this.isLoading = true; // Set loading to true before fetching
    let satelliteIds = this.selectedSatelite;
    this.http
      .post(tleUrl, { satelliteIds }, { responseType: 'json' })
      .subscribe({
        next: (data: any) => {
          // Change to 'any' to handle the response properly
          this.tleData = data.filteredData;
          this.list = data.list;
          this.count = data.filteredData.length;
          this.isFilterPopupVisible = false;
          this.trackAllSatellites(data);
          this.isLoading = false; // Set loading to false after successful fetch
        },
        error: (error) => {
          console.error('Failed to fetch TLE data:', error);
          this.isLoading = false; // Set loading to false even if there's an error
        },
      });
  }

  fetchListData(page: number = 1, limit: number = 10): void {
    const apiUrl = `${environment.apiURL}/satelite/list`; // Dynamic base URL from env
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const tleUrl = `${apiUrl}?${params.toString()}`;

    this.isLoading2 = true; // Show loader before fetching

    this.http.get(tleUrl).subscribe({
      next: (data: any) => {
        this.list = data.list || []; // Ensure list is an array
        this.totalPages = data.totalPages ?? 0; // Handle undefined values
        this.totalItems = data.totalItems ?? 0;
        this.currentPage = data.page ?? 1;
        this.itemsPerPage = data.limit ?? limit;
        this.isLoading2 = false; // Hide loader on success
      },
      error: (error) => {
        console.error('Failed to fetch list data:', error);
        this.isLoading2 = false; // Hide loader on error
      },
    });
  }

  openFilterPopup() {
    this.isFilterPopupVisible = true;
    this.fetchListData();
  }

  closeFilterPopup() {
    this.isFilterPopupVisible = false;
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.fetchListData(this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
    this.fetchListData(this.currentPage);
  }

  updatePagination() {
    if (this.list) {
      this.totalPages = Math.ceil(this.list.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedList = this.list.slice(startIndex, endIndex);
    }
  }

  onPageChange(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.fetchListData(this.currentPage);
    }
  }

  trackAllSatellites(data: any): void {
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });
    this.tleData.forEach((data) => {
      //console.log(data, 'satelliteInfo');

      const satrec = satellite.twoline2satrec(data.tleLine1, data.tleLine2); // Parse TLE data
      //console.log(satrec, 'satrec');

      const satelliteName = data.name;

      const satelliteFeature = new Feature({
        geometry: new Point(fromLonLat([0, 0])), // Initial position (will be updated)
        name: satelliteName,
      });

      satelliteFeature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://static-00.iconduck.com/assets.00/satellite-emoji-1024x1024-4mnws749.png',
            scale: 0.02, // Slightly larger icon
            rotation: 0, // You can rotate it based on satellite direction
          }),
        })
      );

      this.vectorSource.addFeature(satelliteFeature); // Add satellite to map
      this.satelliteFeatures.push(satelliteFeature);

      // Create the Select interaction for hover and click events
      const selectInteraction = new Select({
        condition: pointerMove, // For hover events
        layers: [vectorLayer], // Apply to the vector layer
      });

      // Add the select interaction to the map
      this.map.addInteraction(selectInteraction);

      // Call function to track the satellite and update position
      this.trackSatellite(satrec, satelliteFeature);
    });
  }

  trackSatellite(satrec: any, satelliteFeature: Feature): void {
    let isVisible = true;

    const update = () => {
      const now = new Date();
      const positionAndVelocity = satellite.propagate(satrec, now);

      if (
        !positionAndVelocity.position ||
        typeof positionAndVelocity.position !== 'object'
      ) {
        console.error(`Invalid position data`);
        return;
      }

      const position = satellite.eciToGeodetic(
        positionAndVelocity.position,
        satellite.gstime(now)
      );

      if (position) {
        const latitude = satellite.degreesLat(position.latitude);
        const longitude = satellite.degreesLong(position.longitude);

        const geometry = satelliteFeature.getGeometry();

        if (geometry instanceof Point) {
          geometry.setCoordinates(fromLonLat([longitude, latitude]));
        } else {
          console.error(`Geometry is not a valid Point geometry.`);
        }
      }
    };

    update(); // Initial update
    setInterval(update, 0); // Update position every 2 seconds

    // Pulsing Effect Variables
    let pulseRadius = 5;
    let pulseOpacity = 0.9;
    let pulseAngle = 0; // Used for smooth sinusoidal animation
    const pulseSpeed = 20; // Adjust for smoothness
    const maxRadius = 18; // Max expansion size
    const minRadius = 5; // Min shrink size

    setInterval(() => {
      // Use sine wave function to create smooth pulsing effect
      pulseRadius =
        minRadius +
        (maxRadius - minRadius) * (0.5 + 0.5 * Math.sin(pulseAngle));
      pulseOpacity = 0.5 + 0.3 * Math.sin(pulseAngle); // Subtle opacity changes

      // Increment pulse angle for smooth sinusoidal effect
      pulseAngle += 0.1;
      if (pulseAngle > Math.PI * 2) pulseAngle = 0; // Reset after full cycle

      satelliteFeature.setStyle([
        // Outer Glow (Smooth fade)
        new Style({
          image: new CircleStyle({
            radius: pulseRadius + 5, // Slightly larger for glow effect
            fill: new Fill({ color: `rgba(255, 0, 0, ${pulseOpacity * 0.3})` }),
          }),
        }),

        // Inner Pulse (Main effect)
        new Style({
          image: new CircleStyle({
            radius: pulseRadius,
            fill: new Fill({ color: `rgba(255, 0, 0, ${pulseOpacity})` }),
            stroke: new Stroke({ color: 'rgba(217, 0, 0, 0.73)', width: 1 }),
          }),
        }),

        // Satellite Icon (Static)
        new Style({
          image: new Icon({
            src: 'https://static-00.iconduck.com/assets.00/satellite-emoji-1024x1024-4mnws749.png',
            scale: 0.03,
            opacity: 1, // Always visible
          }),
        }),
      ]);
    }, pulseSpeed);
  }

  // Function to show the satellite popup with details
  showSatellitePopup(
    lonLat: number[],
    satelliteName: string,
    height: number,
    speed: number
  ): void {
    // Check for invalid coordinates
    if (isNaN(lonLat[0]) || isNaN(lonLat[1])) {
      console.error("Invalid coordinates: ", lonLat);
      return; // Exit the function if coordinates are not valid
    }
  
    let latitude = (lonLat[1]).toFixed(2); // Latitude is the second value in lonLat
    let longitude = (lonLat[0]).toFixed(2); // Longitude is the first value in lonLat
  
    // Earth radius (in kilometers)
    const earthRadius = 6371; 

    // Calculate coverage radius (in km)
    const coverageRadius = Math.sqrt(2 * height * earthRadius + Math.pow(height, 2)).toFixed(2);
  
    // Popup content
    const popupContent = `
      <div>
        <button onclick="document.getElementById('satellitePopup').style.display='none'" 
            style="
              position: absolute; 
              top: 8px; 
              right: 10px; 
              border: none; 
              background: #ff4d4d; 
              color: white; 
              font-size: 14px; 
              cursor: pointer; 
              border-radius: 50%; 
              width: 24px; 
              height: 24px;
              text-align: center;
              line-height: 20px;
              font-weight: bold;
            ">
            ✖
          </button>
          <h3 style="margin-top: 0; font-size: 18px; color: white;">
            <strong>🛰&nbsp;</strong>${satelliteName}
          </h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>📍 Latitude: </strong> ${latitude}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>📍 Longitude: </strong> ${longitude}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>↕️ Height: </strong> ${height.toFixed(2)} km</p> 
          <p style="margin: 5px 0; font-size: 14px;"><strong>⏩ Speed: </strong> ${speed.toFixed(2)} km/h</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>🌍 Coverage Radius: </strong> ${coverageRadius} km</p>
        </div>
    `;
  
    // Show the popup
    const popupElement = document.getElementById('satellitePopup');
    if (popupElement) {
      popupElement.innerHTML = popupContent;
      popupElement.style.display = 'block';
      popupElement.style.backgroundColor = 'black';
    }
  }

  
}
