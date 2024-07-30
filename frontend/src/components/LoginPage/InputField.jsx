// eslint-disable-next-line react/prop-types
const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;
