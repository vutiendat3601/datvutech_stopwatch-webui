import classNamesBinding from 'classnames/bind';

import Button from '../button/button.component';
import styles from './form.module.scss';

const css = classNamesBinding.bind(styles);

const Form = ({ title, description, action, onSubmit, fields }) => {
    // field = { type: 'text', fieldName: 'time', message };
    const handleOnSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onClick={(e) => handleOnSubmit}>
            <h3 className={css('title')}>{title}</h3>
            <p className={css('description')}>{description}</p>

            <div className={css('spacer')}></div>

            {fields.map((field) => {
                const { fieldName, label, type, message } = field;
                return (
                    <div className={css('form-group')} key={fieldName}>
                        <label
                            htmlFor={fieldName}
                            className={css('form-label')}
                        >
                            {label}
                        </label>
                        <div className={css('form-input')}>
                            <input
                                id={fieldName}
                                type={type}
                                name={fieldName}
                            />
                        </div>
                        <span className={css('form-message')}>
                            {message || null}
                        </span>
                    </div>
                );
            })}

            <Button className={css('form-submit')} primary>
                {action}
            </Button>
        </form>
    );
};

export default Form;
