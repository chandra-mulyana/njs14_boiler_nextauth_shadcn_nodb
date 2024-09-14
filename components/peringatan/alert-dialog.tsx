"use client";

import { useState, useCallback } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Custom hook to manage dialog state
const useAlertDialog = () => {
	const [isOpen, setIsOpen] = useState(false);
	const openAlert = useCallback(() => setIsOpen(true), []);
	const closeAlert = useCallback(() => setIsOpen(false), []);
	return { isOpen, openAlert, closeAlert };
};

interface AlertDialogProps {
	title: string;
	mode: boolean;
	description: string;
	OKText?: string;
	onConfirm: () => void;
}

export { useAlertDialog };

// Mode : False -> Error Alert
//      : True -> Informasi Alert

export default function ReusableAlertDialog({
	isOpen,
	mode,
	close,
	title,
	description,
	OKText = "OK",
	onConfirm,
}: AlertDialogProps & { isOpen: boolean; close: () => void }) {
	const handleConfirm = () => {
		onConfirm();
		close();
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={close}>
			<AlertDialogContent
				className={`${mode ? "bg-white" : "bg-destructive text-white"}`}
			>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription
						className={`${mode ? "" : "text-white"}`}
					>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={handleConfirm}
						className={`${mode ? "" : "bg-white text-black"}`}
					>
						{OKText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
