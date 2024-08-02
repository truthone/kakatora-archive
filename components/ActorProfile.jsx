import React from 'react';
import { Tabs, Box, Flex, Heading, Text, Avatar, Table } from '@radix-ui/themes';
import { actorData } from './dummyData';

function ActorProfile() {
  const actor = actorData;

  return (
    <Box p="4">
      <Flex align="center" gap="4" mb="4">
        <Avatar size="7" src={actor.profileImage} fallback={actor.name[0]} />
        <Heading size="8">{actor.name}</Heading>
      </Flex>
      
      <Tabs.Root defaultValue="bio">
        <Tabs.List>
          <Tabs.Trigger value="bio">프로필</Tabs.Trigger>
          <Tabs.Trigger value="filmography">필모그래피</Tabs.Trigger>
          <Tabs.Trigger value="awards">수상 경력</Tabs.Trigger>
        </Tabs.List>

        <Box pt="4">
          <Tabs.Content value="bio">
            <Text>{actor.bio}</Text>
          </Tabs.Content>

          <Tabs.Content value="filmography">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>제목</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>연도</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>역할</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {actor.filmography.map((film) => (
                  <Table.Row key={film.id}>
                    <Table.Cell>{film.title}</Table.Cell>
                    <Table.Cell>{film.year}</Table.Cell>
                    <Table.Cell>{film.role}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Tabs.Content>

          <Tabs.Content value="awards">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>상</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>부문</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>연도</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {actor.awards.map((award) => (
                  <Table.Row key={award.id}>
                    <Table.Cell>{award.name}</Table.Cell>
                    <Table.Cell>{award.category}</Table.Cell>
                    <Table.Cell>{award.year}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}

export default ActorProfile;