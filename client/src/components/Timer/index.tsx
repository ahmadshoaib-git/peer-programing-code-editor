import React, { useState, useEffect } from "react";
import { Tag } from "src/components";

export interface Props {
  data?: any;
}
const Timer: React.FC<Props> = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return <Tag color="red">{time.toLocaleTimeString("en-US")}</Tag>;
};

export default React.memo(Timer);
