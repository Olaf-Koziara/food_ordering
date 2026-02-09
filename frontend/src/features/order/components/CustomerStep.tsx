import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CustomerDetailsSchema,
  type CustomerDetails,
} from '@food-ordering/shared';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CustomerStepProps {
  defaultValues?: CustomerDetails;
  onSubmit: (data: CustomerDetails) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const CustomerStep = ({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
}: CustomerStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDetails>({
    resolver: zodResolver(CustomerDetailsSchema),
    defaultValues: defaultValues || {
      customerName: '',
      customerAddress: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-[50%] mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Twoje dane</h2>

      <Input
        label="Imię i nazwisko"
        {...register('customerName')}
        error={errors.customerName?.message}
      />

      <Input
        label="Adres dostawy"
        {...register('customerAddress')}
        error={errors.customerAddress?.message}
      />

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Powrót do produktów
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Złóż zamówienie
        </Button>
      </div>
    </form>
  );
};
