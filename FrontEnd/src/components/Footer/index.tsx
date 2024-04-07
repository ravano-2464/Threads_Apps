import { Card, CardBody, Text } from "@chakra-ui/react"

export function Footer() {
  return (
    <Card bg={"transparent"} boxShadow={"0 0 6px rgba(0, 0, 0, 0.5)"}>
      <CardBody display={"flex"} alignItems={"center"} gap={2}>
        <Text fontSize={"12px"} fontWeight={"bold"}>
          Developed by Ravano Akbar Widodo
        </Text>
      </CardBody>
    </Card>
  )
}
