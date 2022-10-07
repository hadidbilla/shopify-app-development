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
import {  useAuthenticatedFetch } from "../hooks";
export default function HomePage() {
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const fetch = useAuthenticatedFetch();

  const handleSelection = (resources) => {
    setOpen(false);
    setResources(resources.selection);
    console.log();
    getCollection({res:resources.selection[0]});
  };

  const getCollection = async ({res}) => {
    const sliceId = res.id.split("/").pop();
    const response = await fetch(`/api/collection`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...res, id:sliceId}),
    });
    // console.log(response);
    const stream = await response.body.getReader().read();
    const collectionData = new TextDecoder("utf-8").decode(stream.value);
    const collection = JSON.parse(collectionData);
    setSelectedCollection(collection);
    // console.log(collection);
  }

  
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
        selectMultiple={false}
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
      {selectedCollection && <ProductsCard selectedCollection={selectedCollection.products} resources={resources[0]}/>}
        {/* <ProductsCard resources={resources[0]}/> */}
      </Card>
    </Page>
  );
}
