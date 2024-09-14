"use client";

import { useState, useCallback } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
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
	description: string;
	cancelText?: string;
	confirmText?: string;
	onConfirm: () => void;
	onCancel?: () => void;
}

export { useAlertDialog };

export default function ConfirmationDialog({
	isOpen,
	close,
	title,
	description,
	cancelText = "Cancel",
	confirmText = "OK",
	onConfirm,
	onCancel,
}: AlertDialogProps & { isOpen: boolean; close: () => void }) {
	const handleConfirm = () => {
		onConfirm();
		close();
	};

	const handleCancel = () => {
		onCancel?.();
		close();
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={close}>
			<AlertDialogContent className="bg-white ">
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel}>
						{cancelText}
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
