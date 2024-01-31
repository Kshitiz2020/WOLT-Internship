/* prettier-ignore */
export const deliveryConditions = {
  freeDeliveryLimit: 200,        // more than freeDeliveryLimit in cartValue, free delivery
  noSurchargeCartValue: 10,      // less than noSurchargeCartValue in CartValue, extra surcharge
  rushHourDayInWeek: 5,          // 0 is Sunday, 1 is Monday, 2 is Tuesday, 5 is Friday, 6 is Saturday
  rushHourStart: 15,             // 24 hour time format, 3PM = 15
  rushHourEnd: 19,               // 24 hour time format, 7PM = 19
  rushFactor: 1.2,               // factor to multiply by during rush hours
  baseDistance: 1000,            // first base distance (meters) costs different
  stepDistance: 500,             // charged every step distance (meters) travelled, if exceeds base distance
  baseDistanceCharge: 2,         // base charge for first base distance
  stepDistanceCharge: 1,         // charge every step distance travelled
  itemsFreeOfAllCharge: 4,       // items carried without extra charge
  itemsFreeOfBulkCharge: 12,     // number of items after which another bulk charge is added despite extra charge / item
  bulkCharge: 1.2,               // more than itemsFreeOfBulkCharge ? bulk charges is added despite extra charge / item
  chargePerItem: 0.5,            // charge / item after free number of items
  deliveryChargeUpperLimit: 15,  // delivery charge shouldn't exceed the upper limit
}
