import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

// 5-level strength scoring — each rule contributes one point.
export function scorePassword(pw = '') {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw))   score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4); // cap at 4 for the 4-bar UI
}

const LABELS = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
const COLORS = [
  'bg-gray-200',           // empty
  'bg-red-500',            // weak
  'bg-orange-500',         // fair
  'bg-yellow-500',         // good
  'bg-emerald-500',        // strong
];

/**
 * Reusable password input with toggle + strength meter.
 *
 * Props:
 *   value, onChange — controlled input
 *   showStrength — render the strength meter (default false; turn on for register)
 *   placeholder, autoComplete, label, required, disabled
 */
export default function PasswordInput({
  value = '',
  onChange,
  showStrength = false,
  placeholder = '••••••••',
  autoComplete = 'current-password',
  label,
  required,
  disabled,
  id,
  name = 'password',
  invalid = false,
}) {
  const [show, setShow] = useState(false);
  const score = scorePassword(value);
  const filledBars = value.length === 0 ? 0 : Math.max(score, 1);

  return (
    <div>
      {label && <label htmlFor={id} className="label">{label}</label>}
      <div className="relative">
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          className={`input pl-9 pr-11 ${invalid ? 'border-red-400 focus:ring-red-400' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700 transition"
        >
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>

      {showStrength && (
        <div className="mt-2">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                  i < filledBars ? COLORS[score] || 'bg-emerald-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className={`text-xs mt-1 font-medium ${
            value.length === 0 ? 'text-gray-400' :
            score <= 1 ? 'text-red-500' :
            score === 2 ? 'text-orange-500' :
            score === 3 ? 'text-yellow-600' : 'text-emerald-600'
          }`}>
            {value.length === 0
              ? 'Use 8+ characters with letters, numbers and a symbol'
              : `${LABELS[score]} — ${describeMissing(value)}`}
          </p>
        </div>
      )}
    </div>
  );
}

// Tells the user what's still missing from their password — actionable hints.
function describeMissing(pw) {
  const tips = [];
  if (pw.length < 8) tips.push(`${8 - pw.length} more characters`);
  if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw)) tips.push('mix upper & lower case');
  if (!/\d/.test(pw)) tips.push('add a number');
  if (!/[^A-Za-z0-9]/.test(pw)) tips.push('add a symbol (!@#$…)');
  if (tips.length === 0) return 'looks great!';
  return `add ${tips.slice(0, 2).join(' and ')}`;
}
