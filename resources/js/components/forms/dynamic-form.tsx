import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface FormFieldData {
	id: number;
	label: string;
	name: string;
	type: string;
	placeholder: string;
	data_type: string;
	options: string[] | null;
	validation_rules: any;
	is_required: boolean;
	is_full_width: boolean;
}

interface DynamicFormProps {
	fields: FormFieldData[];
	onSubmit: (data: any) => void;
	submitLabel?: string;
	showSubmitButton?: boolean;
	externalForm?: {
		data: Record<string, any>;
		setData: (key: string, value: any) => void;
		errors: Record<string, string>;
		processing: boolean;
	};
}

export default function DynamicForm({
	fields,
	onSubmit,
	submitLabel = "Ajukan Sekarang",
	showSubmitButton = true,
	externalForm
}: DynamicFormProps) {
	const initialData = fields.reduce((acc, field) => {
		acc[field.name] = '';
		return acc;
	}, {} as Record<string, any>);

	// Use internal form if external is not provided
	const internalForm = useForm(initialData);
	const form = externalForm || internalForm;
	const { data, setData, errors, processing } = form;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(data);
	};

	const renderField = (field: FormFieldData) => {
		const commonProps = {
			id: field.name,
			placeholder: field.placeholder,
			required: field.is_required,
			value: data[field.name] || '',
			onChange: (e: any) => setData(field.name, e.target.value),
			className: "h-11 w-full",
			"aria-invalid": !!errors[field.name]
		};

		switch (field.type) {
			case 'textarea':
				return <Textarea {...commonProps} rows={4} />;
			case 'select':
				return (
					<Select
						value={data[field.name]}
						onValueChange={(value) => setData(field.name, value)}
					>
						<SelectTrigger className={commonProps.className}>
							<SelectValue placeholder={field.placeholder} />
						</SelectTrigger>
						<SelectContent>
							{field.options?.map((option) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case 'number':
				return (
					<Input
						type="text"
						inputMode="numeric"
						{...commonProps}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData(field.name, e.target.value.replace(/\D/g, ''))}
					/>
				);
			case 'date':
				return <Input type="date" {...commonProps} />;
			default:
				return <Input type="text" {...commonProps} />;
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
				{fields.map((field) => {
					const isTextArea = field.type === 'textarea';
					const isFullWidth = field.is_full_width || isTextArea;

					return (
						<div
							key={field.id}
							className={cn(
								"flex flex-col gap-2",
								isFullWidth ? "md:col-span-2" : "md:col-span-1"
							)}>
							<Label
								htmlFor={field.name}
								className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1"
							>
								{field.label}
								{field.is_required && <span className="text-rose-500">*</span>}
							</Label>
							<div className="relative group/field">
								{renderField(field)}
							</div>
							{errors[field.name] && (
								<p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1">
									{errors[field.name]}
								</p>
							)}
						</div>
					);
				})}
			</div>

			{showSubmitButton && (
				<Button
					type="submit"
					disabled={processing}
					className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 dark:shadow-none"
				>
					{processing ? (
						<>
							<Loader2 className="mr-2 h-5 w-5 animate-spin" />
							Sedang Memproses...
						</>
					) : (
						submitLabel
					)}
				</Button>
			)}
		</form>
	);
}
