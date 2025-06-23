import './Matador.css'
import React, { useEffect, useRef } from "react";

interface MatadorProps {
    setMatadorPosition: (newMatadorPosition: number) => void;
    matadorPosition: number;
    applause: number;
}
export const Matador = React.memo(({ setMatadorPosition, matadorPosition, applause }: MatadorProps) => {

    // This is the implementation of the matador movement.
    const matadorPositionRef = useRef(matadorPosition);

    useEffect(() => {
        matadorPositionRef.current = matadorPosition;
    }, [matadorPosition]);

    useEffect(() => {
        const matadorMovement = (event: CustomEvent) => {
            if (event.detail.position === matadorPositionRef.current) {
                let newMatadorPosition = Math.floor(Math.random() * 8);
                while (newMatadorPosition === matadorPosition) {
                    newMatadorPosition = Math.floor(Math.random() * 8);
                }
                console.log(`Matador is moving from ${matadorPosition} to ${newMatadorPosition}`
                );
                setMatadorPosition(newMatadorPosition);
            }
        };
        document.addEventListener("bullRun", matadorMovement as EventListener);

        return () => document.removeEventListener("bullRun", matadorMovement as EventListener);
    }, []);

    // This is the implementation of applause.
    const prevApplause = useRef(0);

    useEffect(() => {
        if (applause !== prevApplause.current) {
            const audio = new Audio(`/sounds/applause${applause}.wav`);
            audio
                .play()
                .catch((error) => {
                    console.error("Error while playing sound:", error);
                });
        }
        console.log("applause = "+ applause + ", "+ "prevApplause = " + prevApplause.current);

        if (applause === 3 && prevApplause.current !== 3) {
            console.log("Render!")
        }
        prevApplause.current = applause;
    }, [applause]);

    return (
        <div className="matador">
            <div className="matadorYoung"></div>
        </div>
    );
}, (prevProps, currentProps) => {
    return !(currentProps.applause === 3 && prevProps.applause !== 3);
});
