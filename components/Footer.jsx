import React from 'react';
import { Link, Text, Flex, Section } from '@radix-ui/themes';

function Footer() {
  return (
    <Section style={{ backgroundColor: 'var(--color-panel-solid)' }}>
      <Flex direction="column" justify="center" align="center" gap="2">
        <Text size="2" color="gray">
          &copy; 2024 HBD ju-seung
        </Text>
        <Flex gap="4" wrap="wrap" justify="center" align="center">
          <Text size="1" color="gray">CONTACT: </Text>
          <Link
            size="1"
            color="gray"
            underline="hover"
            target="_blank"
            href="https://x.com/ju___h_i__"
          >
            X (twitter)
          </Link>
          <Link
            size="1"
            color="gray"
            underline="hover"
            target="_blank"
            href="mailto:j.dingdingdingding@gmail.com"
          >
            Mail
          </Link>
        </Flex>
      </Flex>
    </Section>
  );
}

export default Footer;
