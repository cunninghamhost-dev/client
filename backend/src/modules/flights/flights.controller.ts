import type { Request, Response } from "express";

/**
 * GET /flights
 */
export const getAllFlights = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "All flights fetched",
  });
};

/**
 * GET /flights/:id
 */
export const getFlightById = async (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: `Flight ${id} fetched`,
  });
};

/**
 * POST /flights
 */
export const createFlight = async (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "Flight created",
  });
};

/**
 * PATCH /flights/:id
 */
export const updateFlight = async (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: `Flight ${id} updated`,
  });
};

/**
 * DELETE /flights/:id
 */
export const deleteFlight = async (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: `Flight ${id} deleted`,
  });
};
