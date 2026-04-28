import { FiCheckCircle, FiClock, FiPackage, FiTruck, FiHome, FiX } from 'react-icons/fi';

const STEPS = [
  { key: 'pending',          label: 'Order Placed',     icon: <FiClock />,       desc: 'We received your order' },
  { key: 'confirmed',        label: 'Confirmed',        icon: <FiCheckCircle />, desc: 'Payment confirmed, order accepted' },
  { key: 'packed',           label: 'Packed',           icon: <FiPackage />,     desc: 'Items packed and ready to ship' },
  { key: 'shipped',          label: 'Shipped',          icon: <FiTruck />,       desc: 'Order handed to courier' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: <FiTruck />,       desc: 'Driver is on the way' },
  { key: 'delivered',        label: 'Delivered',        icon: <FiHome />,        desc: 'Successfully delivered' },
];

export default function OrderTimeline({ status, history = [], estimatedDelivery, trackingNumber }) {
  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <FiX className="mx-auto text-red-500" size={32} />
        <p className="mt-2 font-bold text-red-700">Order Cancelled</p>
      </div>
    );
  }

  const currentIdx = STEPS.findIndex((s) => s.key === status);
  const findEvent = (key) => history.find((h) => h.status === key);

  return (
    <div className="bg-white border rounded-lg p-5">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="font-bold text-lg">Order Tracking</h2>
          {estimatedDelivery && status !== 'delivered' && (
            <p className="text-sm text-gray-600 mt-1">
              Estimated delivery: <span className="font-semibold">{new Date(estimatedDelivery).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </p>
          )}
          {trackingNumber && (
            <p className="text-sm text-gray-600 mt-1">Tracking: <span className="font-mono font-semibold">{trackingNumber}</span></p>
          )}
        </div>
      </div>

      {/* Desktop horizontal timeline */}
      <div className="hidden md:flex items-start justify-between relative">
        <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200 z-0"></div>
        <div
          className="absolute top-5 left-5 h-1 bg-green-500 z-0 transition-all duration-700"
          style={{ width: currentIdx > 0 ? `calc(${(currentIdx / (STEPS.length - 1)) * 100}% - ${currentIdx === STEPS.length - 1 ? '0' : '0px'})` : '0%' }}
        ></div>
        {STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          const event = findEvent(step.key);
          return (
            <div key={step.key} className="flex flex-col items-center relative z-10 w-full">
              <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition
                ${done ? 'bg-green-500 border-green-500 text-white' : ''}
                ${active ? 'bg-primary-500 border-primary-500 text-white animate-pulse' : ''}
                ${!done && !active ? 'bg-white border-gray-300 text-gray-400' : ''}`}>
                {step.icon}
              </div>
              <p className={`mt-2 text-xs font-semibold text-center ${done || active ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.label}
              </p>
              {event && (
                <p className="text-[10px] text-gray-500 mt-0.5 text-center">
                  {new Date(event.at).toLocaleDateString()} <br /> {new Date(event.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden space-y-3">
        {STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          const event = findEvent(step.key);
          return (
            <div key={step.key} className="flex gap-3 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm
                  ${done ? 'bg-green-500 border-green-500 text-white' : ''}
                  ${active ? 'bg-primary-500 border-primary-500 text-white' : ''}
                  ${!done && !active ? 'bg-white border-gray-300 text-gray-400' : ''}`}>
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-0.5 h-8 ${done ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className={`font-semibold text-sm ${done || active ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                <p className="text-xs text-gray-500">{step.desc}</p>
                {event && (
                  <p className="text-[11px] text-gray-400 mt-0.5">{new Date(event.at).toLocaleString()}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
