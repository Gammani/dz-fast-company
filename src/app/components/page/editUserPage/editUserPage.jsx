import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserPage = () => {
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const params = useParams();
    const { userId } = params;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const history = useHistory();
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Элекеронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        history.push(`/users/${userId}`);
    };
    const handleBack = () => {
        history.push(`/users/${userId}`);
    };
    useEffect(() => {
        api.users.update(userId, data);
    }, [data]);
    console.log(data);
    const isValid = Object.keys(errors).length === 0;
    if (data) {
        return (
            <form onSubmit={handleSubmit}>
                <button type={"button"} className={"btn btn-primary mx-auto"} onClick={handleBack}>Назад</button>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <TextField label={"Имя"} name={"name"} value={data.name} error={errors.name} onChange={handleChange}/>
                            <TextField label={"Электронная почта"} name={"email"} value={data.email} error={errors.email} onChange={handleChange}/>
                            <SelectField
                                onChange={handleChange}
                                defaultOption={"Choose..."}
                                options={professions}
                                error={errors.profession}
                                value={data.profession._id}
                                label={"Выберите вашу профессию"}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "Other" }
                                ]}
                                value={data.sex}
                                name ={"sex"}
                                onChange = {handleChange}
                                label={"Выберите ваш пол"}
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name={"qualities"}
                                label={"Выберите ваши качества"}
                            />
                            <button type={"submit"} disabled={!isValid} className={"btn btn-primary w-100 mx-auto"}>Обновить</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    return "loading...";
};

export default EditUserPage;
