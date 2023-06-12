// seatActions.ts
export const updateSeatEnabled = (seatIndex: number, enabled: boolean) => {
  console.log("Action - Updated Seat Enabled:", seatIndex, enabled); // Log updated seat
  return {
    type: 'UPDATE_SEAT_ENABLED',
    seatIndex,
    enabled,
  };
};
