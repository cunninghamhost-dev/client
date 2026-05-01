import type { Request, Response } from "express";
export declare const getAirports: (req: Request, res: Response) => Promise<void>;
export declare const getFlights: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const confirmFlightPrice: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const bookFlightController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const cancelFlight: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const payForFlight: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const multiCitySearch: (req: Request, res: Response) => Promise<void>;
export declare const getAirlinesController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=flights.controller.d.ts.map