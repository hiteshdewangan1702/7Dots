import { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SkipForward, Plus, Clock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import './RoutingTimer.css'

export default function RoutineTimer() {
    const [timeLeft, setTimeLeft] = useState(60);
    const intervalRef = useRef(null);
    const totalTime = 60;

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [timeLeft]);

    const addTime = () => setTimeLeft((prev) => Math.min(prev + 10, totalTime));
    const skipStep = () => setTimeLeft(0);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="routine-container">
                <h3 className="fs-4 fw-medium text-center">Routine starting in...</h3>
                <p className="text-secondary text-center small">Subheading here</p>

                <div className="progress-wrapper">
                    <CircularProgressbar
                        value={(timeLeft / totalTime) * 100}
                        text={`00:${String(timeLeft).padStart(2, "0")}`}
                        strokeWidth={5.5}
                        styles={buildStyles({
                            pathColor: "#6A3E78",
                            trailColor: "#EAEAEA",
                            textColor: "#000",
                            textSize: "16px"
                        })}
                    />

                </div>

                <div className="d-flex justify-content-between w-100 px-4 pt-3 pb-5">
                    <button className="timer-button" onClick={addTime} >
                        <Plus size={16} /> <span>10 sec</span>
                    </button>

                    <button className="timer-button" onClick={skipStep}>
                        <SkipForward size={16} /> <span>Skip</span>
                    </button>
                </div>

                <div className="step-card">
                    <p className="text-secondary small mb-0">
                        <span className="fs-6 fw-bold">Step 2</span>/3
                    </p>

                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <div className="emoji-icon">🧴</div>
                            <div className="step-details">
                                <p className="fw-semibold mb-1 pt-4">Cleansing</p>

                                <span className="d-flex">
                                    <p className="text-secondary small clock" >
                                        <Clock size={14} className="me-1 align-middle" />
                                    </p>
                                    <p>60 sec</p>
                                </span>

                            </div>
                        </div>

                        <p className="fw-bold how-to" role="button">
                            How to do
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
