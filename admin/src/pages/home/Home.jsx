import "./home.css"
import FeatureInfo from "../../components/featureInfo/FeatureInfo";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useEffect, useState } from "react";
import axios from "axios"
import { useMemo } from "react";
const Home = () => {
    const MONTHS = useMemo(
        () =>
            [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ], [])

    const [userStats, setUserStats] = useState([])
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("/api/users/stats",
                    {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    }
                )
                const statsSort = res.data.sort((a, b) => a._id - b._id)
                const stats = statsSort.map(item => ({ name: MONTHS[item._id - 1], "NewUser": item.total }))
                setUserStats(stats)

            } catch (err) {
                console.log(err)
            }
        }
        getStats()
    }, [])
    return (
        <div className="home">
            <FeatureInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="NewUser" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
};

export default Home;
