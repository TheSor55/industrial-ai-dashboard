# Industrial AI Assistant – Phase 1 MVP

Prototype HTML App สำหรับโรงงานอุตสาหกรรม เพื่อคำนวณและวิเคราะห์เบื้องต้นด้าน:

- OEE
- Downtime
- Scrap
- Energy Cost
- Carbon Emission
- Rule-based AI Insight

## จุดประสงค์

ใช้เป็น MVP สำหรับ Kick-off โครงการ Industrial AI & ESG Transformation โดยเริ่มจากการทำให้ข้อมูลการผลิตมองเห็นได้ก่อน แล้วค่อยต่อยอดไปสู่ IIoT, Analytics, AI และ ESG Dashboard

## โครงสร้างโปรเจกต์

```text
industrial-ai-assistant-phase1/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── calculations.js
│   ├── insights.js
│   └── storage.js
├── assets/
│   └── .gitkeep
├── README.md
└── LICENSE
```

## วิธีใช้งาน

1. ดาวน์โหลดหรือ clone project
2. เปิดไฟล์ `index.html` ด้วย browser
3. กรอกข้อมูลการผลิต
4. กด `คำนวณ`
5. Copy report ไปใช้วิเคราะห์หรือประชุมได้

## สูตรหลัก

### Availability

```text
Availability = Runtime / Planned Production Time
```

### Performance

```text
Performance = (Ideal Cycle Time × Total Output) / Runtime
```

### Quality

```text
Quality = Good Output / Total Output
```

### OEE

```text
OEE = Availability × Performance × Quality
```

### Scrap Rate

```text
Scrap Rate = Scrap Quantity / Total Output
```

### Energy Cost

```text
Energy Cost = kWh × Electricity Cost
```

### Carbon Emission

```text
Carbon Emission = kWh × Emission Factor
```

## Phase Roadmap

### Phase 1: Foundation & Visibility

- OEE Dashboard
- Downtime Tracking
- Scrap Tracking
- Energy Cost
- Carbon Emission

### Phase 2: Integration & Analytics

- Sensor / IIoT
- MQTT / OPC-UA
- Downtime Pareto
- Energy Trend
- Root Cause Analytics

### Phase 3: AI & ESG Integration

- AI Recommendation
- Predictive Maintenance
- Carbon Dashboard
- ESG Compliance Tracker

### Phase 4: Autonomous & Continuous Improvement

- Digital Twin
- AI Optimization
- Auto Improvement Loop
- Smart Factory Maturity System

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Chart.js CDN
- LocalStorage

## หมายเหตุ

Prototype นี้ใช้สำหรับการเรียนรู้ การสาธิต และการเริ่มต้นโครงการเท่านั้น  
ก่อนใช้งานจริงด้าน ESG / Carbon / Audit ต้องตรวจสอบสูตร ค่า Emission Factor และบริบทของโรงงานตามมาตรฐานที่เกี่ยวข้อง
