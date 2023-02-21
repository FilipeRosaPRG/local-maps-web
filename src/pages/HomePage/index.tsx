import {
    Container,
    Title,
    Button,
    Image,
    LeftContainer,
    RightContainer,
    SubTitle,
    ButtonBox,
} from "./styles";
import { Link } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5';

export default function HomePage() {
    return (
        <Container>
            <LeftContainer>
                <Title>O Mapa local da de sua cidade</Title>
                <SubTitle>Encontre no comércio local tudo que precisa</SubTitle>

                <Link to={"/new"}>
                    <Button>
                        <ButtonBox>
                            <IoExitOutline />
                        </ButtonBox>
                        Cadastre um ponto comercial
                    </Button>
                </Link>
            </LeftContainer>

            <RightContainer>
                <Image />
            </RightContainer>
        </Container>
    );
}