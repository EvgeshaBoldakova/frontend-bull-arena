import './Matador.css'
import React from "react";

interface MatadorProps {
    setMatadorPosition: (newMatadorPosition: number) => void;
    matadorPosition: number;
    applause: number;
}

export class OldMatador extends React.Component<MatadorProps> {

    // This is the implementation of the matador movement.
    constructor(props: MatadorProps) {
        super(props);
        this.matadorMovement = this.matadorMovement.bind(this)
    }

    matadorMovement(event: CustomEvent) {
        if (event.detail.position === this.props.matadorPosition) {
            let newMatadorPosition = Math.floor(Math.random() * 8);
            while (newMatadorPosition === this.props.matadorPosition) {
                newMatadorPosition = Math.floor(Math.random() * 8);
            }
            console.log(`Matador is moving from ${this.props.matadorPosition} to ${newMatadorPosition}`
            );
            this.props.setMatadorPosition(newMatadorPosition);
        }
    }

    componentDidMount() {
        document.addEventListener("bullRun", this.matadorMovement as EventListener);
    }

    componentWillUnmount() {
        document.removeEventListener("bullRun", this.matadorMovement as EventListener);
    }

    // This is the implementation of applause.
    prevApplause:number = 0;

    componentDidUpdate(previousProps: MatadorProps) {
        if (previousProps.applause !== this.props.applause) {
            const audio = new Audio(`/sounds/applause${this.props.applause}.wav`);
            audio
                .play()
                .catch((error) => {
                    console.error("Error while playing sound:", error);
                });
        }
        console.log("applause = "+ this.props.applause + ", "+ "prevApplause = " + this.prevApplause);
        if (this.props.applause === 3 && this.prevApplause !== 3) {
            console.log("Render!")
        }
        this.prevApplause = this.props.applause;
    }

    shouldComponentUpdate(nextProps: MatadorProps): boolean {
        return nextProps.applause === 3 && this.prevApplause !== 3;
    }

    render() {
        return (
            <div className="matador">
                <div className="matadorOld"></div>
            </div>
        );
    }
}
