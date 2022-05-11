export interface TimeSeriesRoot {
  result: Result[]
}

export interface Result {
  success: boolean
  errorCode: string
  errorText: string
  id: string
  stackTrace: string
  MyEnergyData_MarketDocument: MyEnergyDataMarketDocument
}

export interface MyEnergyDataMarketDocument {
  mRID: string
  createdDateTime: string
  "sender_MarketParticipant.name": string
  "sender_MarketParticipant.mRID": SenderMarketParticipantMRid
  "period.timeInterval": PeriodTimeInterval
  TimeSeries: TimeSery[]
}

export interface SenderMarketParticipantMRid {
  codingScheme: string
  name: string
}

export interface PeriodTimeInterval {
  start: string
  end: string
}

export interface TimeSery {
  mRID: string
  businessType: string
  curveType: string
  "measurement_Unit.name": string
  MarketEvaluationPoint: MarketEvaluationPoint
  Period: Period[]
}

export interface MarketEvaluationPoint {
  mRID: MRid
}

export interface MRid {
  codingScheme: string
  name: string
}

export interface Period {
  resolution: string
  timeInterval: TimeInterval
  Point: Point[]
}

export interface TimeInterval {
  start: string
  end: string
}

export interface Point {
  position: string
  "out_Quantity.quantity": string
  "out_Quantity.quality": string
}
