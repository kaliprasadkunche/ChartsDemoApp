
# Chart Analysis Application

This is a React-based web application for displaying various types of charts (line chart, bar chart, pie chart, scatter chart) based on different timeframes (daily, weekly, monthly).

![Untitled design](https://github.com/kaliprasadkunche/ChartsDemoApp/assets/113325469/9b9f0966-80c7-415d-880e-cd9621d54f56)


## Features

- **Dynamic Chart Rendering:** Display different types of charts (line, bar, pie, scatter) based on selected timeframe.
- **Interactive Timeframe Selector:** Allows users to switch between daily, weekly, and monthly data views.
- **Data Export:** Each chart can be exported as a PNG image for further use.
- **Responsive Design:** Supports both desktop and mobile views.

## Technologies Used

- **React:** Frontend framework for building user interfaces.
- **Material-UI:** Provides styled React components for a consistent UI.
- **ECharts:** JavaScript charting library for interactive visualizations.
- **Axios:** Promise-based HTTP client for making API requests.
- **CSS Modules:** Local scoped CSS by default in React applications.

## Project Structure

```
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Chart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── ScatterChart.tsx
│   │   └── TimeframeSelector.tsx
│   ├── styles
│   │   └── Chart.module.css
│   ├── App.tsx
│   └── index.tsx
├── data.json
├── package.json
└── README.md
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your/repository.git
   cd repository-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

1. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. **Select Timeframes:**
   Click on the "Day", "Week", or "Month" buttons to switch between different data views.

3. **Export Charts:**
   Each chart has an "Export as PNG" button to download the chart as an image.

## Contributing

Contributions are welcome! Please follow the GitHub flow:
- Fork the repository
- Create a new branch (`git checkout -b feature/my-feature`)
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to the branch (`git push origin feature/my-feature`)
- Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Adjust the paths and details according to your project structure and specific requirements. This template provides a basic structure covering installation, usage, contribution guidelines, and license information.
