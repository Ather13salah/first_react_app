import React, { useEffect, useState } from "react";
import "./TopSection.css";
import BottomSection from "./BottomSection";
function PrayerApp() {
  const date = new Date();
  const currentDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  const [prayerTimes, setPrayerTimes] = useState({});
  const [cityName, setCityName] = useState("");
  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "بورسعيد", value: "Port Said" },
    { name: "السويس", value: "Suez" },
    { name: "الأقصر", value: "Luxor" },
    { name: "أسوان", value: "Aswan" },
    { name: "أسيوط", value: "Asyut" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "الزقازيق", value: "Zagazig" },
    { name: "الإسماعيلية", value: "Ismailia" },
    { name: "الفيوم", value: "Faiyum" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "دمياط", value: "Damietta" },
    { name: "المنيا", value: "Minya" },
    { name: "قنا", value: "Qena" },
    { name: "سوهاج", value: "Sohag" },
    { name: "البحيرة", value: "Beheira" },
    { name: "الشرقية", value: "Sharqia" },
    { name: "كفر الشيخ", value: "Kafr El Sheikh" },
  ];
  const getPrayerTimes = (city) => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/06-26-2025?city=Eg&country=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPrayerTimes(data.data.timings);
      });
  };
  useEffect(() => {
    getPrayerTimes(cityName);
  }, [cityName]);

  const formatTime = (time) => {
    if (!time) return "00:00";

    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${perd}`;
  };
  return (
    <div>
      <div className="top-section">
        <div className="city">
          <h3>المدينة</h3>
          <select onChange={(e) => setCityName(e.target.value)}>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="date">
          <h3>التاريخ</h3>
          <h1>{currentDate}</h1>
        </div>
      </div>
      <hr></hr>
      <BottomSection name="الفجر" time={formatTime(prayerTimes.Fajr)} />
      <BottomSection name="الظهر" time={formatTime(prayerTimes.Dhuhr)} />
      <BottomSection name="العصر" time={formatTime(prayerTimes.Asr)} />
      <BottomSection name="المغرب" time={formatTime(prayerTimes.Maghrib)} />
      <BottomSection name="العشاء" time={formatTime(prayerTimes.Isha)} />
    </div>
  );
}
export default PrayerApp;
