<?php

class CreateRickAndMorty
{
    public function create()
    {
        $model = new RickAndMortyModel("Rick Sanchez", "https://rickandmortyapi.…/character/avatar/1.jpeg");
        return $model;
    }
}