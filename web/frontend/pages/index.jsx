import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  ResourceList,
  ResourceItem,
  TextStyle,
} from "@shopify/polaris";
import {ProductsCard} from '../components/ProductsCard';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { useState } from "react";
// import products from "../..";
export default function HomePage() {
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSelection = (resources) => {
    setOpen(false);
    setResources(resources.selection);
  };

  
  return (
    <Page
      title={'product selector'}
      primaryAction={{
        content: 'Select products',
        onAction: () => setOpen(true)
      }}>
      <ResourcePicker
        resourceType={'Collection'}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onSelection={(resources) => {
          handleSelection(resources);
        }}/>
      <Card>
        <ResourceList
          resourceName={{singular: 'collection', plural: 'collections'}}
          items={resources}
          renderItem={
            ({id,title}) => {
              return(
                <ResourceItem id={id}>
                <h3>
                <TextStyle variation="strong">{title}</TextStyle>
              </h3>
                </ResourceItem>
              )
            }
          }>

        </ResourceList>
      </Card>
      <Card>
        <ProductsCard/>
      </Card>
    </Page>
  );
}
