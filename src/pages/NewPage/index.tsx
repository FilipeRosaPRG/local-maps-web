import InputComponent from "../../components/InputComponent";
import {
    Button,
    ButtonContainer,
    CategoryBox,
    CategoryContainer,
    CategoryImage,
    Container,
    Form,
    FormTitle,
    MapContainer,
    Section,
} from "./styles";
import { useState } from "react";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { Marker, TileLayer, useMapEvent } from "react-leaflet";
import { categories } from "./categories";
import useGetLocation from "../../hooks/useGetlocation";
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export default function NewPage() {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(
        {
            name: "",
            description: "",
            category: "",
            contact: "",
            coords: [0, 0],
        }
    );

    const { coords } = useGetLocation();

    if (!coords) {
        return (
            <div>
                Obtendo localização
            </div>
        )
    }

    async function onSubmit() {
        const request = await fetch('http://localhost:3000/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    ...formValues,
                    latitude: formValues.coords[0],
                    longitude: formValues.coords[1],
                }
            ),
        });
        if (request.ok) {
            toast('Comércio cadastrado com sucesso', {
                type: 'success',
                autoClose: 3000,
                onClose: () => navigate('/'),
                theme: 'light',
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const MapEvents = () => {
        useMapEvent('click', (event: LeafletMouseEvent) => {
            setFormValues({
                ...formValues,
                coords: [event.latlng.lat, event.latlng.lng]
            })
        })
        return null
    }



    return (
        <Container>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}
            >
                <FormTitle>
                    Cadastro do comércio local
                </FormTitle>

                <Section>
                    Dados
                </Section>

                <InputComponent
                    label={"Nome do Local"}
                    name={"name"}
                    value={formValues.name}
                    onChange={setFormValues}
                    type={"text"}
                />

                <InputComponent
                    label={"Descrição"}
                    name={"description"}
                    value={formValues.description}
                    onChange={setFormValues}
                    type={"textarea"}
                />

                <InputComponent
                    label={"Contato"}
                    name={"contact"}
                    value={formValues.contact}
                    onChange={setFormValues}
                    mask={"(00) 00000-0000"}
                    maskSelectOnFocus={true}
                    type={"tel"}
                 
                />

                <Section>Endereço</Section>

                <MapContainer
                    center={{
                        lat: coords[0],
                        lng: coords[1]
                    } as LatLngExpression}
                    zoom={13}
                    scrollWheelZoom={false}

                >

                    <TileLayer
                        attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={
                            [formValues.coords[0],
                            formValues.coords[1]] as LatLngExpression
                        }
                    />
                    <MapEvents />
                </MapContainer>

                <Section>Categoria</Section>

                <CategoryContainer>
                    {
                        categories.map((category) => (
                            <CategoryBox
                                key={category.key}
                                onClick={() =>
                                    setFormValues({
                                        ...formValues,
                                        category: category.key
                                    })}
                                isActive={category.key === formValues.category}

                            >
                                <CategoryImage
                                    src={category.url}
                                />

                                {category.label}
                            </CategoryBox>
                        ))
                    }
                </CategoryContainer>

                <ButtonContainer>
                    <Button>Salvar</Button>
                </ButtonContainer>
            </Form>
        </Container >
    );
}