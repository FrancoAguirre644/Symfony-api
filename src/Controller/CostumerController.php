<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\Costumer;

class CostumerController extends AbstractApiController
{
    public function indexAction(): Response
    {
        $costumers = $this->getDoctrine()->getRepository(Costumer::class)->findAll();

        return $this->json($costumers);
    }
}
