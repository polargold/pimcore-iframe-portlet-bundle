<?php

namespace Polargold\PolargoldIFramePortletBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PolargoldIFramePortletBundle extends AbstractPimcoreBundle
{
    /**
     * @return string[]
     * @noinspection SpellCheckingInspection
     */
    public function getJsPaths(): array
    {
        return [
            '/bundles/polargoldiframeportlet/js/pimcore/startup.js'
        ];
    }
}
