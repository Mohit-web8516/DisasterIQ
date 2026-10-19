export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    service: "DisasterIQ Backend",
    status: "operational",
    timestamp: new Date().toISOString(),
  });
};