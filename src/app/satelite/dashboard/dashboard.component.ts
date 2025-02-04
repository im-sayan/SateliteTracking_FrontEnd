import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { pointerMove } from 'ol/events/condition';
import { Select } from 'ol/interaction';
import nominatim from 'nominatim-browser';
import { ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
  selectedSatelite: any = [
    'ISS (ZARYA)',
    'STARLINK-1522',
    'NOAA 15',
    'NSS-11',
  ];
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

    // Create the map
    this.map = new Map({
      target: 'globeContainer', // Ensure this target matches the element id
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0], // Adjust center
        zoom: 2,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 100,
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          }),
          opacity: 0.5,
        }),
        this.vectorLayer,
      ],
      controls: [new FullScreen()],
    });

    // Create the Select interaction with pointerMove condition
    const selectInteraction = new Select({
      condition: pointerMove, // Use pointerMove condition to track pointer movement
      layers: [this.vectorLayer], // Apply to vector layer
    });

    // Add the select interaction to the map
    this.map.addInteraction(selectInteraction);

    // Add event listener for selecting a feature on pointermove
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
              console.log(position, 'position');
              console.log(velocity, 'velocity');

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
      console.log('Satellite coordinates:', lonLat);

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
    console.log(item, "item");
  
    // Check if item is already selected
    const index = this.selectedSatelite.indexOf(item);
    
    if (index > -1) {
      // ❌ If already selected, remove it
      this.selectedSatelite.splice(index, 1);
    } else {
      // ✅ Otherwise, add it
      this.selectedSatelite.push(item);
    }
  
    console.log(this.selectedSatelite, "this.selectedSatelite");
  }
  
  clearFilters() {
    this.selectedSatelite = []; // ✅ Clear all selections
     this.list.forEach((f: any) => f.selected = false);
    this.fetchTLEData();
  }
  
  applyFilters() {
    this.fetchTLEData();
  }

  fetchTLEData(): void {
    const tleUrl = 'https://satelitetracking-backend.onrender.com/satelite/track';

    this.isLoading = true; // Set loading to true before fetching
    let satelliteIds = this.selectedSatelite;
    console.log(satelliteIds, 'satelliteIds');
    this.http
      .post(tleUrl, { satelliteIds }, { responseType: 'json' })
      .subscribe({
        next: (data: any) => {
          // Change to 'any' to handle the response properly
          this.tleData = data.filteredData;
          this.list = data.list;
          console.log(this.tleData, 'this.tleData');
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
    const tleUrl = `https://satelitetracking-backend.onrender.com/satelite/list?page=${page}&limit=${limit}`;

    this.isLoading2 = true; // Set loading to true before fetching
    this.http.get(tleUrl).subscribe({
      next: (data: any) => {
        this.list = data.list; // Update the list of satellite names
        this.totalPages = data.totalPages; // Update total pages
        this.totalItems = data.totalItems; // Update total items count
        this.currentPage = data.page; // Update the current page
        this.itemsPerPage = data.limit; // Update the limit (items per page)
        //this.updatePagination(); // Call method to update pagination UI
        this.isLoading2 = false; // Set loading to false after successful fetch
      },
      error: (error) => {
        console.error('Failed to fetch list data:', error);
        //this.isLoading = false; // Set loading to false even if there's an error
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
    this.fetchListData(this.currentPage)
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
    this.fetchListData(this.currentPage)
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
    // Convert the coordinates back to longitude and latitude if needed
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
        <h3 style="margin-top: 0; font-size: 18px; color: white;">🚀 ${satelliteName}</h3>
        <p style="margin: 5px 0; font-size: 14px;"><strong>🌍 Latitude: </strong> ${
          lonLat[1]
        }</p>
        <p style="margin: 5px 0; font-size: 14px;"><strong>📍 Longitude: </strong> ${
          lonLat[0]
        }</p>
        <p style="margin: 5px 0; font-size: 14px;"><strong>🛰️ Height: </strong> ${height.toFixed(
          2
        )} km</p> 
        <p style="margin: 5px 0; font-size: 14px;"><strong>⚡ Speed: </strong> ${speed.toFixed(
          2
        )} km/h</p>
      </div>
    `;

    // Dynamically set the content of the popup
    const popupElement = document.getElementById('satellitePopup');
    if (popupElement) {
      popupElement.innerHTML = popupContent;
      popupElement.style.display = 'block'; // Show the popup
      popupElement.style.backgroundColor = 'black'; // Show the popup
    }
  }
}
