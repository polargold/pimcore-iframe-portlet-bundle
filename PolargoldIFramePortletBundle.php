<?php

namespace Polargold\PolargoldIFramePortletBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\PimcoreBundleAdminClassicInterface;
use Pimcore\Extension\Bundle\Traits\BundleAdminClassicTrait;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;

class PolargoldIFramePortletBundle extends AbstractPimcoreBundle implements PimcoreBundleAdminClassicInterface
{
    use BundleAdminClassicTrait;
    use PackageVersionTrait;

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
