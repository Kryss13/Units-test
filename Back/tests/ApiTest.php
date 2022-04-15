<?php

namespace App\Tests;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpClient\MockHttpClient;
use Symfony\Component\HttpClient\Response\MockResponse;
use Symfony\Contracts\HttpClient\ResponseInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Model\RickAndMortyModel;
use App\Service\CreateRickAndMorty;

class ApiTest extends WebTestCase
{
    private $dataMock = [
        "id" => 21,
        "name" => "Mock data api",
        "price" => "150",
        "quantity" => 50,
        "image" => "https://rickandmortyapi.com/api/character/avatar/12.jpeg"
    ];

    public function apiTest(): void
    {
        $rickAndMorty = new CreateRickAndMorty();
        $test = new RickAndMortyModel("Rick Sanchez", "https://rickandmortyapi.…/character/avatar/1.jpeg");
        $this->assertEquals($test, $rickAndMorty->create());
    }
    
    public function testIndex()
    {
        $client = static::createClient();
        $client->request('GET', '/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();

        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello"], $responseData);
    }
    
    public function testApiHelloWorld(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();

        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testFindByID()
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products/3');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData,[
            "id" => 3,
            "name" => "Summer Smith",
            "price" => $responseData["price"],
            "quantity" => $responseData["quantity"],
            "image" => "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
        ]);
    }

    public function testAddProduct()
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/products', $this->dataMock);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, $this->dataMock);
    }

    public function testSetName() 
    {
        $model = new RickAndMortyModel();
        $model->setName("John Doe");

        $this->assertEquals("John Doe", $model->getName());
    }

    public function testSetImage() 
    {
        $model = new RickAndMortyModel();
        $model->setImage("JohnDoe.png");

        $this->assertEquals("JohnDoe.png", $model->getImage());
    }

    public function testAddProductToCart()
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/'.$this->dataMock["id"], $this->dataMock);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ["id"=> 1, "products"=> [0 => $this->dataMock]]);
    }

    public function testDeleteProductToCart()
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/cart/'.$this->dataMock["id"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ["id"=> 1, "products"=> []]);
    }

    public function testDeleteProduct()
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/products/'.$this->dataMock["id"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ['delete' => 'ok']);
    }
}
