import { formatNumber } from "utils/helpers";

const DetailOfferPayment = ({
  dataOfferPoVendors,
  totalOfferedPrice,
  deliveryCost,
  totalAdditionalCost,
  grandTotal,
}) => {
  const priceDetails = [
    { label: "Subtotal", value: totalOfferedPrice },
    { label: "Biaya Pengiriman", value: deliveryCost },
    ...(dataOfferPoVendors?.costs?.map((item) => ({
      label: item.cost_name,
      value: totalAdditionalCost,
    })) || []),
    { label: "Pajak", value: 120000 },
    { label: "Harga Grand Total", value: grandTotal },
  ];

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        {priceDetails.map((item, index) => (
          <p key={`label-${index}`} className="text-base font-semibold">
            {item.label}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {priceDetails.map((item, index) => (
          <p
            key={`value-${index}`}
            className="text-base text-black font-semibold"
          >
            {formatNumber(item.value)}
          </p>
        ))}
      </div>
    </div>
  );
};
export default DetailOfferPayment;
