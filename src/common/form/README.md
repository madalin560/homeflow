# Form infrastructure

### Overview

Current form infrastructure is built on top of [rc-field-form](https://www.npmjs.com/package/rc-field-form).

This npm package allowed us to create a declarative way of using forms while also having strong validations and form dependencies.

The starting idea of the way this was built is to separate the input value handling and the actual input that is displaying the value.

### How to declare a form?

1. We have to wrap everything in a `Form` component that can receive a object with initial values and a submit handler.

2. Then every field has to be wrapped in `FormField` component that accepts a label, a name which will be the key of the value in the final payload that the form generates, an array of rules that represents the validations and a required boolean value that will display the mandatory symbol.

3. Inside the `FormField` we can use any input form from `src/common/form/field-types`. Every input type can receive specific props like `options` for a `SelectInput`. Please check the component definition propTypes.

4. Add a `SubmitButton` that will trigger the submit action.

```javascript
<Form initialValues={initialValues} onFinish={handleSubmit}>
  <FormField
    label={TEXT.name}
    name="optionalSubjectName"
    rules={[RULES.required]}
    required
  >
    <TextInput />
  </FormField>
  <FormField label={TEXT.slug} name="slug" rules={[RULES.required]} required>
    <TextInput />
  </FormField>
  <FormField
    label={TEXT.lectureHours}
    name="lectureHours"
    rules={[RULES.required, RULES.integer]}
    required
  >
    <TextInput />
  </FormField>
  <FormField
    label={TEXT.seminarHours}
    name="seminarHours"
    rules={[RULES.required, RULES.integer]}
    required
  >
    <TextInput />
  </FormField>
  <FormField
    label={TEXT.evaluationForm}
    name="evaluationForm"
    rules={[RULES.required]}
    required
  >
    <SelectInput options={EVALUATION_FORM_OPTIONS} />
  </FormField>
  <FormField name="doneInSemigroups" rules={[RULES.required]}>
    <CheckboxInput text={TEXT.doneInSemigroups} />
  </FormField>
  <SubmitButton>{TEXT.add}</SubmitButton>
</Form>
```

### How it works?

Internally each `FormField` clones the children (the actual input type used) and injects to it the `value` and a `onChange` handler to update the form value.

This allows clients to declare and use the fields and the inputs without bothering how they are connected.

### Validations

For less boilerplate, common validations rules have been declared in `src/common/validations` and can be imported and used as in the above example.

The current infrastructure also allows us to create custom validators for more specific validations:

```javascript
const validation = createValidation({
  validation: (value) => value > 0 && value <= studyProgram.numberOfSemesters,
  errorMessage: TEXT.semesterMustBeValid,
});

<FormField label={TEXT.semester} name="semester" rules={[validation]} required>
  <TextInput />
</FormField>;
```

To create a validation we need to provide a function that will return a true or false value and a error message to be displayed for false value. After this we can simply pass our custom validator to the `rules` props of a `FormField`.

### Form dependencies

Often form fields are depending on each other values and this can be very hard to maintain. For these cases we can take advantage of the `FormDependency` component.

```javascript
<FormField
    label={TEXT.semester}
    name="semester"
    rules={[validation]}
    required
>
    <TextInput />
</FormField>
<FormDependency dependencies={["semester"]}>
    {({ semester }) => {
        return (
            <FormField
                label={TEXT.direction}
                name="semesterDependentField"
                rules={[RULES.required]}
                required
            >
                <TextInput />
            </FormField>
        );
    }}
</FormDependency>
```

To resolve the above scenario, we need to wrap the dependent field into a `FormDependency` component that will receive a list of field names that it depends on.

Then inside a render function that will provide the dependencies values we will render the field with access to all dependencies values.
