import { Container, InputStyled } from "./styles";
import { useState } from "react";

interface InputProps {
    label: string,
    name: string,
    value: string,
    onChange: Function,
    mask?: string,
    maskSelectOnFocus?: boolean,
    type?: string
}

export default function InputComponent({ label, name, value, onChange, mask, maskSelectOnFocus, type }: InputProps) {

    return (
        <Container>
            <label style={{ marginBottom: "0.5rem" }}>{label}</label>
            <InputStyled
                required
                name={name}
                value={value}
                data-mask={mask}
                data-mask-selectonfocus={maskSelectOnFocus}
                maxLength={mask ? mask.length : 255}
                type={type}
                onChange={event => {
                    onChange((prev: any) => ({
                        ...prev,
                        [name]: event.target.value
                    }))
                }}
            />
        </Container>
    );
}