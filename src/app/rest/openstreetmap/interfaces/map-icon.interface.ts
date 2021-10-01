/**
 * @example
  var myIcon = L.icon({
      iconUrl: 'my-icon.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
  });
  L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
 */
export interface MapIconInterface {
	url: string;
	text?: string;
	size?: number[];
	anchor?: number[];
	popupAnchor: number[];
	urlShadow?: string;
	sizeShadow?: number[];
	anchorShadow?: number[];
}
