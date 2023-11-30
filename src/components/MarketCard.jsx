import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const MarketCard = ({ market }) => {
  const router = useRouter();
  return (
    <Card
      isPressable
      isHoverable
      className="py-4"
      onPress={() => router.push(`/${market.id}`)}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="font-bold text-large">{market.data().name}</h1>
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center">
        <Image alt="Card background" src={market.data().cover} width={500} />
      </CardBody>
      <CardFooter>
        <p className="text-md">
          {market.data().location.city}, {market.data().location.state}
        </p>
      </CardFooter>
    </Card>
  );
};

export default MarketCard;
