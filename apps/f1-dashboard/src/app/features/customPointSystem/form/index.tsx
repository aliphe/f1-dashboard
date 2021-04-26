import React from 'react';
import { PointSystem } from '@f1-dashboard/api-interfaces';
import { Field, Form, Formik } from 'formik';
import { Button, Input, List, ListItem } from '@material-ui/core';

interface Props {
  initialValues: PointSystem;
  onChange: (pointSystem: PointSystem) => void;
}

const CustomPointSystemForm: React.FC<Props> = (props: Props) => {
  const { initialValues, onChange } = props;
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onChange(values);
        }}
      >
        <Form>
          <Field type="number" name="fastestLap" placeholder="Fastest Lap" />
          <List>
            <h3>Position</h3>
            {Object.keys(initialValues.pointsByPosition).map((position) => (
              <ListItem key={position}>
                <Field name={`pointsByPosition.${position}`}>
                {({ field, form, meta }) => (
                  <Input {...field} type="number" label={'P'+position}></Input>
                   )}
                  </Field>
              </ListItem>
            ))}
          </List>
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomPointSystemForm;
