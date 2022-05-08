export interface MeteringPoint
  {
    streetCode: string,
    streetName: string,
    buildingNumber: string,
    floorId: string,
    roomId: string,
    citySubDivisionName: string,
    municipalityCode: string,
    locationDescription: string,
    settlementMethod: string,
    meterReadingOccurrence: string,
    firstConsumerPartyName: string,
    secondConsumerPartyName: string,
    meterNumber: string,
    consumerStartDate: Date,
    meteringPointId: number,
    typeOfMP: string,
    balanceSupplierName: string,
    postcode: number,
    cityName: string,
    hasRelation: boolean,
    consumerCVR: string,
    dataAccessCVR: string,
    childMeteringPoints: [
        {
            parentMeteringPointId: string,
            meteringPointId: string,
            typeOfMP: string,
            meterReadingOccurrence: string,
            meterNumber: string
        },
        {
            parentMeteringPointId: string,
            meteringPointId: string,
            typeOfMP: string,
            meterReadingOccurrence: string,
            meterNumber: string
        }
    ]
}
