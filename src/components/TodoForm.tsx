import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'ducks/store';
import { createTodo, TodoType } from 'ducks/todos';
import { closeModal } from 'ducks/modal';

import styles from 'css/components/todoForm.module';

interface Props {
  resource?: TodoType
}

interface FormValues {
  title: string;
  description: string;
  priority: number;
  tags: string[];
}

const createSelectOption = (option: string | number) => ({
  label: option, value: option
})

const TodoForm: React.FC<Props> = ({
  resource = {},
}) => {

  const isViewMode = Object.keys(resource).length > 0;
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const titleText = resource ? 'View Todo' : 'Create Todo';
  const priorityOptions = [1,2,3].map(createSelectOption);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      dispatch(closeModal());
      setIsLoading(false);
    }
  }, [todos]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>{titleText}</h2>
      <Formik
        initialValues={{
          title: resource.title || '',
          description: resource.description || '',
          priority: resource.priority || 2,
          tags: resource.tags || [],
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(35, 'Must be 15 characters or less')
            .required('Required'),
          description: Yup.string()
            .max(255, 'Must be 255 characters or less')
            .required('Required'),
        })}
        onSubmit={(values: FormValues) => {
          setIsLoading(true)
          dispatch(createTodo(values as TodoType))
        }}
      >
        <Form className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="title">Title</label>
            <Field
              className={styles.formInput}
              name="title"
              type="text"
              disabled={isViewMode}
            />
          </div>
          <div className={styles.formError}>
            <ErrorMessage name="title" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="description">Description</label>
            <Field
              className={styles.formInput}
              name="description"
              as="textarea"
              disabled={isViewMode}
            />
          </div>
          <div className={styles.formError}>
            <ErrorMessage name="description" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="priority">Priority</label>
            <Field
              className={styles.formInput}
              name="priority"
              component={FormikSelect}
              options={priorityOptions}
              isDisabled={isViewMode}
            />
          </div>
          <div className={styles.formRow}>
            <label className={styles.formLabel} htmlFor="tags">Tags</label>
            <Field
              className={styles.formInput}
              name="tags"
              component={FormikCreatableSelect}
              isMulti
              placeholder={'Select or type...'}
              isClearable
              isDisabled={isViewMode}
              options={[
                // These should be coming from there own state - ideally from BE, but could be scraped from loadTodos data using a Set
                  'fitness',
                  'dog walk',
                  'housework'
                ].map(createSelectOption)
              }
            />
          </div>
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => dispatch(closeModal())}
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            { !isViewMode &&
              <button
                type="submit"
                className={styles.saveButton}
              >
                {!isLoading ? 'Submit' : (
                  <div className={styles.loader} />
                )}
              </button>
            }
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default TodoForm;

interface FormikFieldProps {
  field: any;
  form: any;
}

const FormikCreatableSelect = ({
  field,
  form: { touched, errors },
  ...props
}: FormikFieldProps) => {
  const defaultValue = field.value.map(createSelectOption);
  return (
    <>
      <CreatableSelect {...props}
        defaultValue={defaultValue}
        onChange={(newValue: any, actionMeta: any) => {
          field.onChange({ target: {
            name: field.name,
            value: newValue.map((option) => option.label)
          }})
        }}
      />
      {touched[field.name] && errors[field.name] &&
        <div className="error">{errors[field.name]}</div>
      }
    </>
  );
};

const FormikSelect = ({
  field,
  form: { touched, errors },
  ...props
}: FormikFieldProps) => {
  const defaultValue = field.value ? createSelectOption(field.value) : null;
  return (
    <>
      <Select {...props}
        defaultValue={defaultValue}
        onChange={(option) => {
          field.onChange({ target: {
            name: field.name,
            value: option.value
          }})
        }}
      />
      {touched[field.name] && errors[field.name] &&
        <div className="error">{errors[field.name]}</div>
      }
    </>
  );
};
