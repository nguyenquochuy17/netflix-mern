import './chart.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data, title, grid, dataKey }) => {

    return (
        <div className='chart'>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart
                    data={data}
                >
                    {grid && <CartesianGrid strokeDasharray="3 3" stroke="#e0dfdf" />}
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
