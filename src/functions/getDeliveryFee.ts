import { FormData } from "../Types"
import { deliveryConditions as dc } from "./deliveryConditions"

export function getDeliveryFee(data: FormData) {
  let isRushHour: boolean = false

  if (data.cartValue >= dc.freeDeliveryLimit) {
    return 0
  }

  if (new Date(data.dateOfOrder).getDay() === dc.rushHourDayInWeek) {
    const [hrs, mins] = data.timeOfOrder.split(":")

    if (Number(hrs) >= dc.rushHourStart && Number(hrs) < dc.rushHourEnd) {
      isRushHour = true
    }
  }

  const surcharge: number =
    data.cartValue < dc.noSurchargeCartValue
      ? dc.noSurchargeCartValue - data.cartValue
      : 0

  const distanceCharge: number =
    data.distance < dc.baseDistance
      ? dc.baseDistanceCharge
      : dc.baseDistanceCharge +
        Math.ceil((data.distance - dc.baseDistance) / dc.stepDistance) *
          dc.stepDistanceCharge

  const itemsCharge: number =
    data.numberOfItems > dc.itemsFreeOfAllCharge
      ? data.numberOfItems > dc.itemsFreeOfBulkCharge
        ? (data.numberOfItems - dc.itemsFreeOfAllCharge) * dc.chargePerItem +
          dc.bulkCharge
        : (data.numberOfItems - dc.itemsFreeOfAllCharge) * dc.chargePerItem
      : 0

  const grossDeliveryCharge: number =
    surcharge + distanceCharge + itemsCharge > dc.deliveryChargeUpperLimit
      ? dc.deliveryChargeUpperLimit
      : surcharge + distanceCharge + itemsCharge

  const netDeliveryCharge: number = isRushHour
    ? grossDeliveryCharge * dc.rushFactor > dc.deliveryChargeUpperLimit
      ? dc.deliveryChargeUpperLimit
      : grossDeliveryCharge * dc.rushFactor
    : grossDeliveryCharge

  return Number(netDeliveryCharge.toFixed(2))
}
