import React from 'react';
import PropTypes from 'prop-types';

export function LanguageSwitcher({language, languages, onChange}) {

  return (
    <div className='mb-4 text-right'>
      <select className='p-2 rounded bg-darkGreen border text-lg' value={language} onChange={(event) => onChange(event.target.value)}>
        {languages.map((language, i) => {
          return <option key={i} value={language.code}>{ language.name }</option>
        })}
      </select>
    </div>
  )

}

LanguageSwitcher.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func
}