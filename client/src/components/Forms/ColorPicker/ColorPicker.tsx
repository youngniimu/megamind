import './colorpicker.scss';
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';

interface SliderProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}
console.log('render ');
const ColorPicker = ({ setColor, color }: SliderProps): JSX.Element => {
  const [rgbColor, setRGBColor] = useState({ r: '55', g: '55', b: '55' });

  useEffect(() => {
    setColor(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`);
  }, [rgbColor]);
  return (
    <div className="color-picker">
      <label>
        <input
          onChange={(e) =>
            setRGBColor({ r: e.target.value, g: rgbColor.g, b: rgbColor.g })
          }
          type="range"
          min="0"
          max="255"
          step="5"
        />
      </label>
      <label>
        <input
          onChange={(e) =>
            setRGBColor({ g: e.target.value, r: rgbColor.g, b: rgbColor.g })
          }
          type="range"
          min="0"
          max="255"
          step="5"
        />
      </label>
      <label>
        <input
          onChange={(e) =>
            setRGBColor({ b: e.target.value, g: rgbColor.g, r: rgbColor.g })
          }
          type="range"
          min="0"
          max="255"
          step="5"
        />
      </label>
    </div>
  );
};

export { ColorPicker };
