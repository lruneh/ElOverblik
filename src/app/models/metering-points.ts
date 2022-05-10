  export interface ChildMeteringPoint {
    parentMeteringPointId: string;
    meteringPointId: string;
    typeOfMP: string;
    meterReadingOccurrence: string;
    meterNumber: string;
  }

  export interface MeteringPointResult {
    streetCode: string;
    streetName: string;
    buildingNumber: string;
    floorId?: any;
    roomId?: any;
    citySubDivisionName?: any;
    municipalityCode: string;
    locationDescription: string;
    settlementMethod: string;
    meterReadingOccurrence: string;
    firstConsumerPartyName: string;
    secondConsumerPartyName: string;
    meterNumber?: any;
    consumerStartDate: Date;
    meteringPointId: string;
    typeOfMP: string;
    balanceSupplierName: string;
    postcode: string;
    cityName: string;
    hasRelation: boolean;
    consumerCVR: string;
    dataAccessCVR: string;
    childMeteringPoints: ChildMeteringPoint[];
  }

  export interface MeteringPointRootObject {
    result: MeteringPointResult[];
  }
