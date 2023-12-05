import { formatHour } from "@/functions/hourFormatter";
import { Chip, Input } from "@nextui-org/react";
import { useState } from "react";

const ScheduleInput = ({
  disabled = false,
  startValue,
  endValue,
  setData,
  isInvalid,
  errorMessage,
}) => {
  const [schedule, setSchedule] = useState({
    startHour: startValue,
    endHour: endValue,
  });
  const { startHour, endHour } = schedule;
  return (
    <div className="w-full grid grid-cols-2 gap-2 justify-items-center">
      <Input
        isDisabled={disabled}
        value={startHour}
        required
        isInvalid={isInvalid}
        errorMessage={isInvalid && errorMessage}
        type="time"
        label="Hora de apertura"
        onChange={(e) => {
          setSchedule((prevSchedule) => ({
            ...prevSchedule,
            startHour: e.target.value,
          }));
          setData((prevData) => ({
            ...prevData,
            schedule: `${formatHour(e.target.value)} - ${formatHour(endHour)}`,
          }));
        }}
      />
      <Input
        isDisabled={disabled}
        required
        isInvalid={isInvalid}
        value={endHour}
        type="time"
        label="Hora de cierre"
        onChange={(e) => {
          setSchedule((prevSchedule) => ({
            ...prevSchedule,
            endHour: e.target.value,
          }));
          setData((prevData) => ({
            ...prevData,
            schedule: `${formatHour(startHour)} - ${formatHour(
              e.target.value
            )}`,
          }));
        }}
      />
    </div>
  );
};

export default ScheduleInput;
