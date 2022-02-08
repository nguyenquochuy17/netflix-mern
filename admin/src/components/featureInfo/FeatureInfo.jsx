import "./featureInfo.css"
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
const FeatureInfo = () => {
    return (
        <div className="feature">
            <div className="featureItem">
                <span className="featureTitle">Revanue</span>
                <div className="featureMoneyContainer">
                    <span className="featureMoney">$2,415</span>
                    <span className="featureMoneyRate">-11,4
                        <ArrowDownward className="featureIcon negative" />
                    </span>
                </div>
                <span className="featureSub">Compared to last month</span>
            </div>
            <div className="featureItem">
                <span className="featureTitle">Sales</span>
                <div className="featureMoneyContainer">
                    <span className="featureMoney">$4,415</span>
                    <span className="featureMoneyRate">-1,4
                        <ArrowDownward className="featureIcon negative" />
                    </span>
                </div>
                <span className="featureSub">Compared to last month</span>
            </div>
            <div className="featureItem">
                <span className="featureTitle">Cost</span>
                <div className="featureMoneyContainer">
                    <span className="featureMoney">$2,225</span>
                    <span className="featureMoneyRate">+2,4
                        <ArrowUpward className="featureIcon" />
                    </span>
                </div>
                <span className="featureSub">Compared to last month</span>
            </div>
        </div>
    );
};

export default FeatureInfo;
