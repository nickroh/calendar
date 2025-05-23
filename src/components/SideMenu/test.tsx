import React from 'react';
import { Button, ButtonProps, PressEvent } from '@heroui/react';
import confetti from 'canvas-confetti';
import type { RootState, AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";

const EasterButton: React.FC<ButtonProps> = (props) => {
	const dispatch = useDispatch<AppDispatch>();
	const darkMode = useSelector((state: RootState) => state.option.darkMode);

	const handleConfetti = (e: PressEvent) => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { x: 0.1, y: 0.85 },
		});
		props.onPress?.(e);
	};

	const buttonColorClass = darkMode
		? "bg-gradient-to-tr from-gray-700 to-gray-500 text-white"
		: "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white";
	return (
		<Button
			disableRipple
			onPress={handleConfetti}
			size="lg"
			className={`${buttonColorClass} relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl after:content-[''] after:absolute after:rounded-full after:inset-0 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`}
			radius="full"
		>
			🎉🤩🌟🪄
		</Button>
	);
};

export default EasterButton;