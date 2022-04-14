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
}
